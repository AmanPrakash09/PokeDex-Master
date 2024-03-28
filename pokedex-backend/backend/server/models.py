from django.db import models

class Counter(models.Model):
    id = models.BigAutoField(primary_key=True)
    count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'Counter'
    
    def __str__(self):
        return str(self.count)